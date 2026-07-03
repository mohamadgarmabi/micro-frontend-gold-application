import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const OTPField = createStyledModule(BaseOTPField, {
  Input: styles.otpInput,
});

export default OTPField;
