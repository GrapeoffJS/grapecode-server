import {
    isEmail,
    isNotEmpty,
    isString,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsLoginOrEmail(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isLoginOrEmail',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!isNotEmpty(value)) {
                        return false;
                    }

                    return isEmail(value) || isString(value);
                },
            },
        });
    };
}
