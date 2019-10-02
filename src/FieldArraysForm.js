import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { arrayPush ,arrayRemoveAll} from 'redux-form';

const renderCardHolderBlock = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
 const update  = (value,dispatch)=>{
   dispatch(arrayRemoveAll('members', 'fieldArrays', value))

   
   dispatch(arrayPush('members', 'fieldArrays', value));
   }

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderCardHolders = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderCardHolderBlock}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderConventions = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <FieldArray name={`${member}.hobbies`} component={renderCardHolders} />
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
    <RenderList/>
      <Field
        name="clubName"
        type="text"
        component={renderField}
        label="Club Name"
      />
      <FieldArray name="members" component={renderConventions} />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export const RenderList = () => (
  <div>
<label>List</label>
<div>
  <Field name="favoriteColor" component="select">
    <option />
    <option value="ff0000">Red</option>
    <option value="00ff00">Green</option>
    <option value="0000ff">Blue</option>
  </Field>
</div>

  </div>
);
export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
