package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FormContent;

import com.mycompany.myapp.repository.FormContentRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FormContent.
 */
@RestController
@RequestMapping("/api")
public class FormContentResource {

    private final Logger log = LoggerFactory.getLogger(FormContentResource.class);

    private static final String ENTITY_NAME = "formContent";

    private final FormContentRepository formContentRepository;

    public FormContentResource(FormContentRepository formContentRepository) {
        this.formContentRepository = formContentRepository;
    }

    /**
     * POST  /form-contents : Create a new formContent.
     *
     * @param formContent the formContent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formContent, or with status 400 (Bad Request) if the formContent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/form-contents")
    @Timed
    public ResponseEntity<FormContent> createFormContent(@RequestBody FormContent formContent) throws URISyntaxException {
        log.debug("REST request to save FormContent : {}", formContent);
        if (formContent.getId() != null) {
            throw new BadRequestAlertException("A new formContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormContent result = formContentRepository.save(formContent);
        return ResponseEntity.created(new URI("/api/form-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /form-contents : Updates an existing formContent.
     *
     * @param formContent the formContent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formContent,
     * or with status 400 (Bad Request) if the formContent is not valid,
     * or with status 500 (Internal Server Error) if the formContent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/form-contents")
    @Timed
    public ResponseEntity<FormContent> updateFormContent(@RequestBody FormContent formContent) throws URISyntaxException {
        log.debug("REST request to update FormContent : {}", formContent);
        if (formContent.getId() == null) {
            return createFormContent(formContent);
        }
        FormContent result = formContentRepository.save(formContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formContent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /form-contents : get all the formContents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formContents in body
     */
    @GetMapping("/form-contents")
    @Timed
    public List<FormContent> getAllFormContents() {
        log.debug("REST request to get all FormContents");
        return formContentRepository.findAll();
        }

    /**
     * GET  /form-contents/:id : get the "id" formContent.
     *
     * @param id the id of the formContent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formContent, or with status 404 (Not Found)
     */
    @GetMapping("/form-contents/{id}")
    @Timed
    public ResponseEntity<FormContent> getFormContent(@PathVariable Long id) {
        log.debug("REST request to get FormContent : {}", id);
        FormContent formContent = formContentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formContent));
    }

    /**
     * DELETE  /form-contents/:id : delete the "id" formContent.
     *
     * @param id the id of the formContent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/form-contents/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormContent(@PathVariable Long id) {
        log.debug("REST request to delete FormContent : {}", id);
        formContentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
