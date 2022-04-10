import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import s from './SearchForm.module.css';

const validationSchema = Yup.object().shape({
  request: Yup.string()
    .lowercase()
    .trim()
    .required(() => toast.error('Please enter the request'))
    .typeError(),
});

const SearchForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ request: '' }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      onSubmit(values);
      setSubmitting = false;
      resetForm({ values: '' });
    }}
  >
    <Form className={s.form} autoComplete="off">
      <button type="submit" className={s.button}>
        <BsSearch />
        <span className={s.label}>Search</span>
      </button>
      <Field
        className={s.input}
        type="text"
        name="request"
        autoFocus
        placeholder="Search images and photos"
      />
      <ErrorMessage name="request" />
    </Form>
  </Formik>
);

export default SearchForm;
