package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ReactsterApp;

import com.mycompany.myapp.domain.FieldOption;
import com.mycompany.myapp.repository.FieldOptionRepository;
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
 * Test class for the FieldOptionResource REST controller.
 *
 * @see FieldOptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactsterApp.class)
public class FieldOptionResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private FieldOptionRepository fieldOptionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFieldOptionMockMvc;

    private FieldOption fieldOption;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldOptionResource fieldOptionResource = new FieldOptionResource(fieldOptionRepository);
        this.restFieldOptionMockMvc = MockMvcBuilders.standaloneSetup(fieldOptionResource)
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
    public static FieldOption createEntity(EntityManager em) {
        FieldOption fieldOption = new FieldOption()
            .value(DEFAULT_VALUE)
            .label(DEFAULT_LABEL);
        return fieldOption;
    }

    @Before
    public void initTest() {
        fieldOption = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldOption() throws Exception {
        int databaseSizeBeforeCreate = fieldOptionRepository.findAll().size();

        // Create the FieldOption
        restFieldOptionMockMvc.perform(post("/api/field-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldOption)))
            .andExpect(status().isCreated());

        // Validate the FieldOption in the database
        List<FieldOption> fieldOptionList = fieldOptionRepository.findAll();
        assertThat(fieldOptionList).hasSize(databaseSizeBeforeCreate + 1);
        FieldOption testFieldOption = fieldOptionList.get(fieldOptionList.size() - 1);
        assertThat(testFieldOption.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testFieldOption.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createFieldOptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldOptionRepository.findAll().size();

        // Create the FieldOption with an existing ID
        fieldOption.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldOptionMockMvc.perform(post("/api/field-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldOption)))
            .andExpect(status().isBadRequest());

        // Validate the FieldOption in the database
        List<FieldOption> fieldOptionList = fieldOptionRepository.findAll();
        assertThat(fieldOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFieldOptions() throws Exception {
        // Initialize the database
        fieldOptionRepository.saveAndFlush(fieldOption);

        // Get all the fieldOptionList
        restFieldOptionMockMvc.perform(get("/api/field-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())));
    }

    @Test
    @Transactional
    public void getFieldOption() throws Exception {
        // Initialize the database
        fieldOptionRepository.saveAndFlush(fieldOption);

        // Get the fieldOption
        restFieldOptionMockMvc.perform(get("/api/field-options/{id}", fieldOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldOption.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFieldOption() throws Exception {
        // Get the fieldOption
        restFieldOptionMockMvc.perform(get("/api/field-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldOption() throws Exception {
        // Initialize the database
        fieldOptionRepository.saveAndFlush(fieldOption);
        int databaseSizeBeforeUpdate = fieldOptionRepository.findAll().size();

        // Update the fieldOption
        FieldOption updatedFieldOption = fieldOptionRepository.findOne(fieldOption.getId());
        // Disconnect from session so that the updates on updatedFieldOption are not directly saved in db
        em.detach(updatedFieldOption);
        updatedFieldOption
            .value(UPDATED_VALUE)
            .label(UPDATED_LABEL);

        restFieldOptionMockMvc.perform(put("/api/field-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldOption)))
            .andExpect(status().isOk());

        // Validate the FieldOption in the database
        List<FieldOption> fieldOptionList = fieldOptionRepository.findAll();
        assertThat(fieldOptionList).hasSize(databaseSizeBeforeUpdate);
        FieldOption testFieldOption = fieldOptionList.get(fieldOptionList.size() - 1);
        assertThat(testFieldOption.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testFieldOption.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldOption() throws Exception {
        int databaseSizeBeforeUpdate = fieldOptionRepository.findAll().size();

        // Create the FieldOption

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFieldOptionMockMvc.perform(put("/api/field-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldOption)))
            .andExpect(status().isCreated());

        // Validate the FieldOption in the database
        List<FieldOption> fieldOptionList = fieldOptionRepository.findAll();
        assertThat(fieldOptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFieldOption() throws Exception {
        // Initialize the database
        fieldOptionRepository.saveAndFlush(fieldOption);
        int databaseSizeBeforeDelete = fieldOptionRepository.findAll().size();

        // Get the fieldOption
        restFieldOptionMockMvc.perform(delete("/api/field-options/{id}", fieldOption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FieldOption> fieldOptionList = fieldOptionRepository.findAll();
        assertThat(fieldOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldOption.class);
        FieldOption fieldOption1 = new FieldOption();
        fieldOption1.setId(1L);
        FieldOption fieldOption2 = new FieldOption();
        fieldOption2.setId(fieldOption1.getId());
        assertThat(fieldOption1).isEqualTo(fieldOption2);
        fieldOption2.setId(2L);
        assertThat(fieldOption1).isNotEqualTo(fieldOption2);
        fieldOption1.setId(null);
        assertThat(fieldOption1).isNotEqualTo(fieldOption2);
    }
}
