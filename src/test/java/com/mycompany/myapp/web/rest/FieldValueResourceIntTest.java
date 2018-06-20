package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ReactsterApp;

import com.mycompany.myapp.domain.FieldValue;
import com.mycompany.myapp.repository.FieldValueRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FieldValueResource REST controller.
 *
 * @see FieldValueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactsterApp.class)
public class FieldValueResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private FieldValueRepository fieldValueRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFieldValueMockMvc;

    private FieldValue fieldValue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldValueResource fieldValueResource = new FieldValueResource(fieldValueRepository);
        this.restFieldValueMockMvc = MockMvcBuilders.standaloneSetup(fieldValueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldValue createEntity(EntityManager em) {
        FieldValue fieldValue = new FieldValue()
            .value(DEFAULT_VALUE);
        return fieldValue;
    }

    @Before
    public void initTest() {
        fieldValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldValue() throws Exception {
        int databaseSizeBeforeCreate = fieldValueRepository.findAll().size();

        // Create the FieldValue
        restFieldValueMockMvc.perform(post("/api/field-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldValue)))
            .andExpect(status().isCreated());

        // Validate the FieldValue in the database
        List<FieldValue> fieldValueList = fieldValueRepository.findAll();
        assertThat(fieldValueList).hasSize(databaseSizeBeforeCreate + 1);
        FieldValue testFieldValue = fieldValueList.get(fieldValueList.size() - 1);
        assertThat(testFieldValue.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createFieldValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldValueRepository.findAll().size();

        // Create the FieldValue with an existing ID
        fieldValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldValueMockMvc.perform(post("/api/field-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldValue)))
            .andExpect(status().isBadRequest());

        // Validate the FieldValue in the database
        List<FieldValue> fieldValueList = fieldValueRepository.findAll();
        assertThat(fieldValueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFieldValues() throws Exception {
        // Initialize the database
        fieldValueRepository.saveAndFlush(fieldValue);

        // Get all the fieldValueList
        restFieldValueMockMvc.perform(get("/api/field-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getFieldValue() throws Exception {
        // Initialize the database
        fieldValueRepository.saveAndFlush(fieldValue);

        // Get the fieldValue
        restFieldValueMockMvc.perform(get("/api/field-values/{id}", fieldValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldValue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFieldValue() throws Exception {
        // Get the fieldValue
        restFieldValueMockMvc.perform(get("/api/field-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldValue() throws Exception {
        // Initialize the database
        fieldValueRepository.saveAndFlush(fieldValue);
        int databaseSizeBeforeUpdate = fieldValueRepository.findAll().size();

        // Update the fieldValue
        FieldValue updatedFieldValue = fieldValueRepository.findOne(fieldValue.getId());
        // Disconnect from session so that the updates on updatedFieldValue are not directly saved in db
        em.detach(updatedFieldValue);
        updatedFieldValue
            .value(UPDATED_VALUE);

        restFieldValueMockMvc.perform(put("/api/field-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldValue)))
            .andExpect(status().isOk());

        // Validate the FieldValue in the database
        List<FieldValue> fieldValueList = fieldValueRepository.findAll();
        assertThat(fieldValueList).hasSize(databaseSizeBeforeUpdate);
        FieldValue testFieldValue = fieldValueList.get(fieldValueList.size() - 1);
        assertThat(testFieldValue.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldValue() throws Exception {
        int databaseSizeBeforeUpdate = fieldValueRepository.findAll().size();

        // Create the FieldValue

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFieldValueMockMvc.perform(put("/api/field-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldValue)))
            .andExpect(status().isCreated());

        // Validate the FieldValue in the database
        List<FieldValue> fieldValueList = fieldValueRepository.findAll();
        assertThat(fieldValueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFieldValue() throws Exception {
        // Initialize the database
        fieldValueRepository.saveAndFlush(fieldValue);
        int databaseSizeBeforeDelete = fieldValueRepository.findAll().size();

        // Get the fieldValue
        restFieldValueMockMvc.perform(delete("/api/field-values/{id}", fieldValue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FieldValue> fieldValueList = fieldValueRepository.findAll();
        assertThat(fieldValueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldValue.class);
        FieldValue fieldValue1 = new FieldValue();
        fieldValue1.setId(1L);
        FieldValue fieldValue2 = new FieldValue();
        fieldValue2.setId(fieldValue1.getId());
        assertThat(fieldValue1).isEqualTo(fieldValue2);
        fieldValue2.setId(2L);
        assertThat(fieldValue1).isNotEqualTo(fieldValue2);
        fieldValue1.setId(null);
        assertThat(fieldValue1).isNotEqualTo(fieldValue2);
    }
}
