import { BlobReference } from "../../application/models/BlobReference";

interface ReferenceS3 {
  type: "s3";
  bucket: string;
  key: string;
}

type Reference = ReferenceS3;

export class BlobReferenceImpl implements BlobReference {
  private readonly reference: Reference;

  constructor(referenceJson: string) {
    this.reference = JSON.parse(referenceJson) as Reference;
  }

  async toView(): Promise<string> {
    switch (this.reference.type) {
      default:
        throw new Error(`Unsupported reference type: ${this.reference.type}`);
    }
  }
}
