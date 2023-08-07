export interface ApiResponse{
    data: any;
    errors: any[];
    meta: {
        length: number;
        
    },
    message: string;
}