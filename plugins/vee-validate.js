import { extend } from 'vee-validate';
import { required, email, max, min, numeric } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: (field) => {
    return `Обязательное поле '${field}'`;
  },
});

extend('corpRequired', {
  ...required,
  message:
    'Не можете зарегистрироваться? Напишите нам на адрес ligamts@yandex.ru, указав свой корпоративный e-mail',
});

extend('float', {
  ...numeric,
  validate: (value) => {
    const numericRegex = /^-?\d*([.,]?\d*)?$/;
    return numericRegex.test(value);
  },
  message: (field) => {
    return `Поле '${field}' может быть только число`;
  },
});

extend('numeric', {
  ...numeric,
  message: (field) => {
    return `Поле '${field}' может быть только число`;
  },
});

extend('max', {
  params: ['length'],
  ...max,
  message: (field, values) => {
    return `Число символов поля '${field}' превысило ${values.length}`;
  },
});

extend('min', {
  params: ['length'],
  ...min,
  message: (field, values) => {
    return `Минимальное число символов поля '${field}' ${values.length}`;
  },
});

extend('email', {
  ...email,
  message: 'Твой корпоративный e-mail не найден в системе',
});

extend('checked', (value) => {
  if (value) return true;

  return 'Обязательное поле';
});

extend('unique', {
  params: ['first', 'second'],
  validate(value, { first, second }) {
    return (
      value?.toLowerCase()?.trim() !== first?.toLowerCase()?.trim() &&
      value?.toLowerCase()?.trim() !== second?.toLowerCase()?.trim()
    );
  },
  message: 'Поле содержит дублирующиеся значения',
});
