import { ApiResponse } from "../dto/ApiResponse"

export const responseFormatter = (input: any) => {
let response:ApiResponse;
    if (input.hasOwnProperty('length')) {
        response={
            data: input,
            errors: null,
            meta: {
                length: input.length,

            },
            message: "ok"
        }
    } else {
        response={
            data: input,
            errors: null,
            meta: {
                length: 1,

            },
            message: "ok"
        }
    }
return response;

}



