
import { inject, injectable } from 'inversify';
import { CsOtpServiceConfig } from '../../..';
import { InjectionTokens } from '../../../injection-tokens';
import { CsHttpRequestType, CsHttpService, CsRequest } from '../../../core/http-service/interface';
import { map } from 'rxjs/operators';
import { CsOtpService, CsGenerateOtpRequest, CsGenerateOtpResponse, CsVerifyOtpRequest, CsVerifyOtpResponse } from '../interface/otp-service';

@injectable()
export class OtpServiceImpl implements CsOtpService {
    constructor(
        @inject(InjectionTokens.core.HTTP_SERVICE) private httpService: CsHttpService,
        @inject(InjectionTokens.services.otp.OTP_SERVICE_API_PATH) private apiPath: string,
    ) {
    }

    generateOtp(data: CsGenerateOtpRequest, config?: CsOtpServiceConfig) {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.POST)
            .withPath(`${config ? config.apiPath : this.apiPath}/otp/v1/generate`)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody(data)
            .build();

        return this.httpService.fetch<{ result: {} }>(apiRequest).pipe(
            map((r) => r.body)
        );
    }
    // /**
    //  * @description To verify Otp
    //  */
    verifyOtp(data: CsVerifyOtpRequest, config?: CsOtpServiceConfig) {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.POST)
            .withPath(`${config ? config.apiPath : this.apiPath}/otp/v1/verify`)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody(data)
            .build();

        return this.httpService.fetch<{ result: {} }>(apiRequest).pipe(
            map((r) => {
                return r.body
            })
        );
    }

}
