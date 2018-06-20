package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FieldOption;

import com.mycompany.myapp.repository.FieldOptionRepository;
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
 * REST controller for managing FieldOption.
 */
@RestController
@RequestMapping("/api")
public class FieldOptionResource {

    private final Logger log = LoggerFactory.getLogger(FieldOptionResource.class);

    private static final String ENTITY_NAME = "fieldOption";

    private final FieldOptionRepository fieldOptionRepository;

    public FieldOptionResource(FieldOptionRepository fieldOptionRepository) {
        this.fieldOptionRepository = fieldOptionRepository;
    }

    /**
     * POST  /field-options : Create a new fieldOption.
     *
     * @param fieldOption the fieldOption to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldOption, or with status 400 (Bad Request) if the fieldOption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/field-options")
    @Timed
    public ResponseEntity<FieldOption> createFieldOption(@RequestBody FieldOption fieldOption) throws URISyntaxException {
        log.debug("REST request to save FieldOption : {}", fieldOption);
        if (fieldOption.getId() != null) {
            throw new BadRequestAlertException("A new fieldOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldOption result = fieldOptionRepository.save(fieldOption);
        return ResponseEntity.created(new URI("/api/field-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /field-options : Updates an existing fieldOption.
     *
     * @param fieldOption the fieldOption to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldOption,
     * or with status 400 (Bad Request) if the fieldOption is not valid,
     * or with status 500 (Internal Server Error) if the fieldOption couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/field-options")
    @Timed
    public ResponseEntity<FieldOption> updateFieldOption(@RequestBody FieldOption fieldOption) throws URISyntaxException {
        log.debug("REST request to update FieldOption : {}", fieldOption);
        if (fieldOption.getId() == null) {
            return createFieldOption(fieldOption);
        }
        FieldOption result = fieldOptionRepository.save(fieldOption);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldOption.getId().toString()))
            .body(result);
    }

    /**
     * GET  /field-options : get all the fieldOptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fieldOptions in body
     */
    @GetMapping("/field-options")
    @Timed
    public List<FieldOption> getAllFieldOptions() {
        log.debug("REST request to get all FieldOptions");
        return fieldOptionRepository.findAll();
        }

    /**
     * GET  /field-options/:id : get the "id" fieldOption.
     *
     * @param id the id of the fieldOption to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldOption, or with status 404 (Not Found)
     */
    @GetMapping("/field-options/{id}")
    @Timed
    public ResponseEntity<FieldOption> getFieldOption(@PathVariable Long id) {
        log.debug("REST request to get FieldOption : {}", id);
        FieldOption fieldOption = fieldOptionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fieldOption));
    }

    /**
     * DELETE  /field-options/:id : delete the "id" fieldOption.
     *
     * @param id the id of the fieldOption to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/field-options/{id}")
    @Timed
    public ResponseEntity<Void> deleteFieldOption(@PathVariable Long id) {
        log.debug("REST request to delete FieldOption : {}", id);
        fieldOptionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
