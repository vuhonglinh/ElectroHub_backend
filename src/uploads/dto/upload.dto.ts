import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UploadRequest {
    @IsNotEmpty({ message: 'Không tìm thấy tài nguyên tải lên!' })
    file: Express.Multer.File
}


export class UploadMutiRequest {
    @ArrayNotEmpty({ message: 'Không tìm thấy tài nguyên tải lên!' })
    @IsArray({ message: 'Không tìm thấy tài nguyên tải lên!' })
    files: Array<Express.Multer.File>;
}