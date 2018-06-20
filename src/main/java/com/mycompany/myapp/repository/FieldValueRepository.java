package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FieldValue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldValueRepository extends JpaRepository<FieldValue, Long> {

}
