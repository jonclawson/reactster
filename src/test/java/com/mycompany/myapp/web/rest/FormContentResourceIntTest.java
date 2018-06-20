package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ReactsterApp;

import com.mycompany.myapp.domain.FormContent;
import com.mycompany.myapp.repository.FormContentRepository;
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
 * Test class for the FormContentResource REST controller.
 *
 * @see FormContentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactsterApp.class)
public class FormContentResourceIntTest {

    @Autowired
    private FormContentRepository formContentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormContentMockMvc;

    private FormContent formContent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormContentResource formContentResource = new FormContentResource(formContentRepository);
        this.restFormContentMockMvc = MockMvcBuilders.standaloneSetup(formContentResource)
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
    public static FormContent createEntity(EntityManager em) {
        FormContent formContent = new FormContent();
        return formContent;
    }

    @Before
    public void initTest() {
        formContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormContent() throws Exception {
        int databaseSizeBeforeCreate = formContentRepository.findAll().size();

        // Create the FormContent
        restFormContentMockMvc.perform(post("/api/form-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formContent)))
            .andExpect(status().isCreated());

        // Validate the FormContent in the database
        List<FormContent> formContentList = formContentRepository.findAll();
        assertThat(formContentList).hasSize(databaseSizeBeforeCreate + 1);
        FormContent testFormContent = formContentList.get(formContentList.size() - 1);
    }

    @Test
    @Transactional
    public void createFormContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formContentRepository.findAll().size();

        // Create the FormContent with an existing ID
        formContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormContentMockMvc.perform(post("/api/form-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formContent)))
            .andExpect(status().isBadRequest());

        // Validate the FormContent in the database
        List<FormContent> formContentList = formContentRepository.findAll();
        assertThat(formContentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFormContents() throws Exception {
        // Initialize the database
        formContentRepository.saveAndFlush(formContent);

        // Get all the formContentList
        restFormContentMockMvc.perform(get("/api/form-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formContent.getId().intValue())));
    }

    @Test
    @Transactional
    public void getFormContent() throws Exception {
        // Initialize the database
        formContentRepository.saveAndFlush(formContent);

        // Get the formContent
        restFormContentMockMvc.perform(get("/api/form-contents/{id}", formContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formContent.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFormContent() throws Exception {
        // Get the formContent
        restFormContentMockMvc.perform(get("/api/form-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormContent() throws Exception {
        // Initialize the database
        formContentRepository.saveAndFlush(formContent);
        int databaseSizeBeforeUpdate = formContentRepository.findAll().size();

        // Update the formContent
        FormContent updatedFormContent = formContentRepository.findOne(formContent.getId());
        // Disconnect from session so that the updates on updatedFormContent are not directly saved in db
        em.detach(updatedFormContent);

        restFormContentMockMvc.perform(put("/api/form-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormContent)))
            .andExpect(status().isOk());

        // Validate the FormContent in the database
        List<FormContent> formContentList = formContentRepository.findAll();
        assertThat(formContentList).hasSize(databaseSizeBeforeUpdate);
        FormContent testFormContent = formContentList.get(formContentList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFormContent() throws Exception {
        int databaseSizeBeforeUpdate = formContentRepository.findAll().size();

        // Create the FormContent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormContentMockMvc.perform(put("/api/form-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formContent)))
            .andExpect(status().isCreated());

        // Validate the FormContent in the database
        List<FormContent> formContentList = formContentRepository.findAll();
        assertThat(formContentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormContent() throws Exception {
        // Initialize the database
        formContentRepository.saveAndFlush(formContent);
        int databaseSizeBeforeDelete = formContentRepository.findAll().size();

        // Get the formContent
        restFormContentMockMvc.perform(delete("/api/form-contents/{id}", formContent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FormContent> formContentList = formContentRepository.findAll();
        assertThat(formContentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormContent.class);
        FormContent formContent1 = new FormContent();
        formContent1.setId(1L);
        FormContent formContent2 = new FormContent();
        formContent2.setId(formContent1.getId());
        assertThat(formContent1).isEqualTo(formContent2);
        formContent2.setId(2L);
        assertThat(formContent1).isNotEqualTo(formContent2);
        formContent1.setId(null);
        assertThat(formContent1).isNotEqualTo(formContent2);
    }
}
