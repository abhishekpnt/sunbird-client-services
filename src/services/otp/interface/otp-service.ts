import { Observable } from 'rxjs';
import { CsOtpServiceConfig } from '../../../index';

export interface CsGenerateOtpResponse {
    result: any
}

export interface CsGenerateOtpRequest {
    key: string,
    userId?: string,
    templateId?: string,
    type: string
}

// tslint:disable-next-line:no-empty-interface
export interface CsVerifyOtpRequest {
    key: string,
    userId: string,
    type: string
    otp: number,
}
// tslint:disable-next-line:no-empty-interface
export interface CsVerifyOtpResponse {
    result: any
}

export interface CsOtpService {

    generateOtp(data: any, config?: CsOtpServiceConfig): Observable<any>;

    verifyOtp(data: any, config?: CsOtpServiceConfig): Observable<any>;
}
