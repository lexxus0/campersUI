import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormValues } from "../../interfaces/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

const CamperForm: React.FC = () => {
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initValues = {
    name: "",
    email: "",
    booking_date: "",
    comment: "",
  };

  const userValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(emailRegExp, "Please provide a valid email"),
    booking_date: Yup.string().required("Date is required"),
    comment: Yup.string(),
  });

  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    toast(`Thank you. We will write you back soon, ${values.name}!`, {
      icon: "✅️",
    });
    resetForm();
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="w-[641px] flex flex-col gap-2 border p-11 rounded-[10px] border-solid border-[#dadde1]">
        <h2 className="text-xl font-semibold text-left">
          Book your camperwan now
        </h2>
        <p className="text-[#6c717b] mb-6">
          Stay connected! We are always ready to help you.
        </p>
        <Formik
          initialValues={initValues}
          validationSchema={userValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, values }) => (
            <Form className="flex flex-col items-center gap-[14px]">
              <div>
                <Field
                  className="w-[527px] h-[60px] pl-[18px] pr-[337px] py-[18px] rounded-xl bg-[#f7f7f7]"
                  name="name"
                  type="text"
                  placeholder="Name*"
                />
                <ErrorMessage name="name" component="span" />
              </div>
              <div>
                <Field
                  className="w-[527px] h-[60px] pl-[18px] pr-[337px] py-[18px] rounded-xl bg-[#f7f7f7]"
                  name="email"
                  type="text"
                  placeholder="Email*"
                />
                <ErrorMessage name="email" component="span" />
              </div>
              <div>
                <DatePicker
                  selected={
                    values.booking_date ? new Date(values.booking_date) : null
                  }
                  onChange={(date) => setFieldValue("booking_date", date)}
                  placeholderText="Booking date*"
                  className="w-[527px] h-[60px] pl-[18px] pr-[337px] py-[18px] rounded-xl bg-[#f7f7f7]"
                />
                <ErrorMessage name="booking_date" component="span" />
              </div>
              <div>
                <Field
                  className="w-[527px] h-[118px] pl-[18px] pr-[308px] pt-[18px] pb-[76px] rounded-[10px] bg-[#f7f7f7] resize-none"
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                />
                <ErrorMessage name="comment" component="span" />
              </div>
              <button type="submit" disabled={Object.keys(errors).length > 0}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CamperForm;
