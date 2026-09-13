/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'VNĐ' | 'USD' | 'FREE' | 'CUSTOM';
  unit?: string;
  icon?: string;
  minimum?: number;
  step?: number;
  type: 'per_unit' | 'package' | 'free';
  note?: string;
  image?: string;
  footerImage?: string;
  details?: {
    overview: string;
    items: string[];
    outcomes: string[];
    categories?: {
      name: string;
      icon: string;
    }[];
  };
}

export interface Company {
  id: string;
  name: string;
  description: string;
  type: string;
  allowedServices: string[];
  serviceNotes?: Record<string, string>;
  serviceOverrides?: Record<string, { name?: string; price: number; currency: 'VNĐ' | 'USD' | 'FREE' | 'CUSTOM' }>;
  developedCategories?: string[];
  ecommercePackages?: string[];
  suggestedServices?: string[];
}

export interface SelectionState {
  [key: string]: {
    selected: boolean;
    quantity: number;
  };
}

export interface CustomPackageItem {
  title: string;
  note?: string;
  image?: string;
}

export interface CustomPackage {
  id: string;
  companyId: string;
  code?: string;
  quotationDate?: string;
  expiryDays?: number;
  name: string;
  tag?: string;
  description: string;
  type: 'package' | 'per_unit';
  unit?: string;
  price?: number;
  currency?: 'VNĐ' | 'USD' | 'FREE' | 'CUSTOM';
  icon?: string;
  targetBrand?: string;
  brandLogo?: string;
  brandLink?: string;
  items: (string | CustomPackageItem)[];
  outcomes?: string[];
  note?: string;
  createdAt: string;
  updatedAt?: string;
}
