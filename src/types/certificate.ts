
export type CertificateTemplate = {
  id: string;
  name: string;
  image: string;
  color: string;
  primaryTextColor: string;
  secondaryTextColor: string;
};

export type SignatureType = 'draw' | 'upload' | 'text';

export type CertificateData = {
  recipientName: string;
  achievement: string;
  issuerName: string;
  issuerTitle: string;
  date: string;
  signatureUrl?: string;
  signatureType: SignatureType;
  templateId: string;
};
