import { Controller, Delete, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UploadMutiRequest } from 'src/uploads/dto/upload.dto';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    try {
      const data = this.uploadsService.handleFileUpload(file);
      return response.status(201).json({
        message: "Uploaded file successfully",
        data
      })
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  @Post('muti')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMutiFile(@UploadedFiles() data: UploadMutiRequest, @Res() response: Response) {
    try {
      console.log(data)
      // const data = this.uploadsService.handleMutiFileUpload(files);
      return response.status(201).json({
        message: "Uploaded muti file successfully",
        data
      })
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }



  @Delete('delete/:filePath')
  deleteFile(@Param('filePath') filePath: string, @Res() response: Response) {
    try {
      this.uploadsService.handleDeleteFile(filePath);
      return response.status(200).json({
        message: 'File deleted successfully',
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Failed to delete file',
      });
    }
  }

}
