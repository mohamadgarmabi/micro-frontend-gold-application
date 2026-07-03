import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { createStyledModule } from '../../lib/create-styled-module';
import { otpfieldStyles } from './otp-field.styles';

const OTPField = createStyledModule(BaseOTPField, otpfieldStyles);

export default OTPField;
