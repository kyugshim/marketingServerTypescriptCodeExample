import { blockedPhoneNumbers } from '../../../src/customerServiceForm/model/enum/salesCusmtoerServiceBlock.enum';

export class PhoneNumberValidator {
  static validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^(010|011)[0-9]{7,8}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
}

export class FindByPhoneNumberToBlock {
  static BlockedPhoneNumbers(phoneNumber: string) {
    if (
      Object.values(blockedPhoneNumbers).includes(
        phoneNumber as blockedPhoneNumbers,
      )
    ) {
      return null;
    }
  }
}
