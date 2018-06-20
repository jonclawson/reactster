package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.FieldType;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Field.class)
public abstract class Field_ {

	public static volatile SingularAttribute<Field, Form> form;
	public static volatile SingularAttribute<Field, String> name;
	public static volatile SingularAttribute<Field, Long> id;
	public static volatile SingularAttribute<Field, FieldType> type;
	public static volatile SingularAttribute<Field, String> title;

}

