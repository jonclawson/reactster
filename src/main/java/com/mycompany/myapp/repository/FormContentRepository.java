package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FormContent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FormContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormContentRepository extends JpaRepository<FormContent, Long> {

}
