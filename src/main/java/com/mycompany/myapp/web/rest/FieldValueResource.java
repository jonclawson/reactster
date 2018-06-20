package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FieldValue;

import com.mycompany.myapp.repository.FieldValueRepository;
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
 * REST controller for managing FieldValue.
 */
@RestController
@RequestMapping("/api")
public class FieldValueResource {

    private final Logger log = LoggerFactory.getLogger(FieldValueResource.class);

    private static final String ENTITY_NAME = "fieldValue";

    private final FieldValueRepository fieldValueRepository;

    public FieldValueResource(FieldValueRepository fieldValueRepository) {
        this.fieldValueRepository = fieldValueRepository;
    }

    /**
     * POST  /field-values : Create a new fieldValue.
     *
     * @param fieldValue the fieldValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldValue, or with status 400 (Bad Request) if the fieldValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/field-values")
    @Timed
    public ResponseEntity<FieldValue> createFieldValue(@RequestBody FieldValue fieldValue) throws URISyntaxException {
        log.debug("REST request to save FieldValue : {}", fieldValue);
        if (fieldValue.getId() != null) {
            throw new BadRequestAlertException("A new fieldValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldValue result = fieldValueRepository.save(fieldValue);
        return ResponseEntity.created(new URI("/api/field-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /field-values : Updates an existing fieldValue.
     *
     * @param fieldValue the fieldValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldValue,
     * or with status 400 (Bad Request) if the fieldValue is not valid,
     * or with status 500 (Internal Server Error) if the fieldValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/field-values")
    @Timed
    public ResponseEntity<FieldValue> updateFieldValue(@RequestBody FieldValue fieldValue) throws URISyntaxException {
        log.debug("REST request to update FieldValue : {}", fieldValue);
        if (fieldValue.getId() == null) {
            return createFieldValue(fieldValue);
        }
        FieldValue result = fieldValueRepository.save(fieldValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /field-values : get all the fieldValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fieldValues in body
     */
    @GetMapping("/field-values")
    @Timed
    public List<FieldValue> getAllFieldValues() {
        log.debug("REST request to get all FieldValues");
        return fieldValueRepository.findAll();
        }

    /**
     * GET  /field-values/:id : get the "id" fieldValue.
     *
     * @param id the id of the fieldValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldValue, or with status 404 (Not Found)
     */
    @GetMapping("/field-values/{id}")
    @Timed
    public ResponseEntity<FieldValue> getFieldValue(@PathVariable Long id) {
        log.debug("REST request to get FieldValue : {}", id);
        FieldValue fieldValue = fieldValueRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fieldValue));
    }

    /**
     * DELETE  /field-values/:id : delete the "id" fieldValue.
     *
     * @param id the id of the fieldValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/field-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteFieldValue(@PathVariable Long id) {
        log.debug("REST request to delete FieldValue : {}", id);
        fieldValueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
