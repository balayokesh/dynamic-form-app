import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FormFieldDefinition {
  name: string;
  label: string;
  inputType: 'text' | 'email' | 'password' | 'select';
  options?: { value: string; label: string }[];
  validatorList: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  form!: FormGroup;
  formFields!: FormFieldDefinition[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const jsonData = {
      formFields: [
        {
          "name": "firstName",
          "label": "First Name",
          "inputType": "text",
          "validatorList": {
            "minLength": 2,
            "maxLength": 30,
            "required": true
          }
        },
        {
          "name": "lastName",
          "label": "Last Name",
          "inputType": "text",
          "validatorList": {
            "minLength": 2,
            "maxLength": 30,
            "required": true
          }
        },
        {
          "name": "gender",
          "label": "Gender",
          "inputType": "select",
          "options": [
            {
              "value": "male",
              "label": "Male"
            },
            {
              "value": "female",
              "label": "Female"
            },
            {
              "value": "other",
              "label": "Other"
            }
          ],
          "validatorList": {
            "required": true
          }
        },
        {
          "name": "email",
          "label": "Email",
          "inputType": "email",
          "validatorList": {
            "required": true,
            "maxLength": 50
          }
        },
        {
          "name": "password",
          "label": "Password",
          "inputType": "password",
          "validatorList": {
            "required": true,
            "minLength": 6,
            "maxLength": 20
          }
        }
      ]
    }

    this.formFields = jsonData.formFields as FormFieldDefinition[];

    const formGroupConfig: { [key: string]: any } = {};
    this.formFields.forEach(field => {
      const validators = this.generateValidators(field.validatorList);
      formGroupConfig[field.name] = [null, validators];
    });

    this.form = this.fb.group(formGroupConfig);
  }

  generateValidators(validatorList: any): any[] {
    const validators = [];
    if (validatorList.required) {
      validators.push(Validators.required);
    }
    if (validatorList.minLength) {
      validators.push(Validators.minLength(validatorList.minLength));
    }
    if (validatorList.maxLength) {
      validators.push(Validators.maxLength(validatorList.maxLength));
    }
    return validators;
  }

  handleSubmit = () => {
    if (this.form.valid) {
      console.log('Form submitted successfully', this.form.value);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
