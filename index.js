// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  const printFormValues = (form) => {
    const inputs = form.querySelectorAll("input");
    console.log("inputs: ", inputs);
    const selects = form.querySelectorAll("select");

    const formValues = {};
    let isValidForm = true; // Variable to track form validation

    let foundFirstInvalidField = false;

    inputs.forEach((input) => {
      formValues[input.id] = input.value;
      const feedback = input.nextElementSibling?.textContent;

      // Mobile validation
      if (input.id === "mobile") {
        if (input.value.length <= 0) {
          toastr.warning(feedback, "Alert");
          isValidForm = false;
          return; // Exit the function
        } else if (!isValidPhoneNumber(input.value)) {
          foundFirstInvalidField = true;
          toastr.warning("Please enter a valid phone number!", "Alert");
          isValidForm = false;
          return; // Exit the function
        }
      }

      // Password validation
      if (input.id === "password") {
        if (input.value.length <= 0) {
          toastr.warning(feedback, "Alert");
          isValidForm = false;
          return;
        } else if (!isPasswordValid(input.value)) {
          foundFirstInvalidField = true;
          toastr.warning(
            "Password must be greater than 8 characters and contain at least one number and one capital letter",
            "Alert"
          );
          isValidForm = false;
          return;
        }
      }

      // Confirm password validation
      if (input.id === "confirmPassword") {
        if (input.value.length <= 0) {
          toastr.warning(feedback, "Alert");
          isValidForm = false;
          return;
        } else if (input.value !== formValues.password) {
          foundFirstInvalidField = true;
          toastr.warning("Password doesn't match", "Alert");
          isValidForm = false;
          return;
        }
      }

      if (!input.validity.valid && !foundFirstInvalidField) {
        foundFirstInvalidField = true;
        toastr.warning(feedback, "Alert");
        isValidForm = false;
        return;
      }
    });

    // Iterate over each select field and store its selected value
    selects.forEach((select) => {
      try {
        formValues[select.id] = select.value;
        const feedback = select.nextElementSibling?.textContent;
        if (!select.validity.valid && !foundFirstInvalidField) {
          foundFirstInvalidField = true;
          toastr.warning(feedback, "Alert");
          isValidForm = false;
          return;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });

    // Log the form values object to the console
    if (!foundFirstInvalidField) {
      const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => {
          // Exclude empty keys, gstnYes, and gstnNo keys
          return (
            key !== "" &&
            key !== "gstnYes" &&
            key !== "gstnNo" &&
            key !== "checkbox"
          );
        })
      );

      console.log("Form Values:", filteredFormValues);
    }
    return isValidForm;
  };

  function isValidPhoneNumber(number) {
    // Regular expression pattern for validating a 10-digit phone number
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(number);
  }

  function isPasswordValid(password) {
    // Password validation criteria: greater than 8 characters, at least one number, and one capital letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        // Check form validity
        if (!form.checkValidity()) {
          printFormValues(form);
          event.stopPropagation();
        } else {
          // Validate form and handle submission
          const isValidForm = printFormValues(form);
          if (isValidForm) {
            toastr.success("Form submitted successfully", "Success"); // Print form input values
          } else {
            event.stopPropagation();
          }
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const stateSelect = document.getElementById("state");

// Loop through the stateData array and create an option for each state
stateData.map((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

const companySelect = document.getElementById("companyType");

// Loop through the companyType array and create an option for each company type
companyType.map((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type;
  companySelect.appendChild(option);
});

const sourceSelect = document.getElementById("source");

// Loop through the source array and create an option for each source type
source.map((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type;
  sourceSelect.appendChild(option);
});

const gstnYesRadio = document.getElementById("gstnYes");
const gstnNoRadio = document.getElementById("gstnNo");
const gstinInput = document.getElementById("gstin");
const companyTypeSelect = document.getElementById("companyType");

// Event listener for the "No" option of GSTN radio buttons
gstnNoRadio.addEventListener("change", () => {
  gstinInput.disabled = true;
});

// Event listener for the "Yes" option of GSTN radio buttons
gstnYesRadio.addEventListener("change", () => {
  gstinInput.disabled = false;
});

// Event listener for the company type select dropdown
companyTypeSelect.addEventListener("change", function () {
  const selectedOption = companyTypeSelect.value;
  const disableGstin =
    selectedOption === "Student" || selectedOption === "Hobbyist";

  // Disable GSTIN input if company type is "Student" or "Hobbyist"
  gstinInput.disabled = disableGstin;
  gstinInput.setAttribute("required", false); // Remove the "required" attribute from GSTIN input
});

const sourceDropdown = document.getElementById("source");
const referralInput = document.getElementById("referral");

// Event listener for the source dropdown
sourceDropdown.addEventListener("change", function () {
  if (sourceDropdown.value === "Referral") {
    referralInput.disabled = false; // Enable referral input
    referralInput.setAttribute("required", true); // Add "required" attribute to referral input
  } else {
    referralInput.disabled = true; // Disable referral input
    referralInput.removeAttribute("required"); // Remove "required" attribute from referral input
  }
});
