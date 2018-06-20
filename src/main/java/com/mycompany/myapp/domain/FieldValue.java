package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FieldValue.
 */
@Entity
@Table(name = "field_value")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FieldValue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @ManyToOne
    private FormContent formContent;

    @ManyToOne
    private Field field;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public FieldValue value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public FormContent getFormContent() {
        return formContent;
    }

    public FieldValue formContent(FormContent formContent) {
        this.formContent = formContent;
        return this;
    }

    public void setFormContent(FormContent formContent) {
        this.formContent = formContent;
    }

    public Field getField() {
        return field;
    }

    public FieldValue field(Field field) {
        this.field = field;
        return this;
    }

    public void setField(Field field) {
        this.field = field;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FieldValue fieldValue = (FieldValue) o;
        if (fieldValue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fieldValue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FieldValue{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
