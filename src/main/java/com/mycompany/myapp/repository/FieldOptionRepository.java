package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FieldOption;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldOptionRepository extends JpaRepository<FieldOption, Long> {

}
