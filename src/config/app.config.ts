interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Owner'],
  customerRoles: [],
  tenantRoles: ['System Owner', 'System Administrator', 'Customer Service Representative'],
  tenantName: 'Company',
  applicationName: 'Vehicle Toll Payment System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage users', 'Manage companies', 'Manage vehicles', 'Manage transactions'],
  getQuoteUrl: 'https://app.roq.ai/proposal/51dc351b-6d86-4e00-8311-4d14b8decf28',
};
