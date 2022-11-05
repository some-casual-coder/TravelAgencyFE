import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Hotel } from 'classes/hotel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  API_PATH = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: any) {
    console.log("Uploading ....");
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: `${environment.S3_ACCESS_KEY}`,
        secretAccessKey: `${environment.S3_SECRET_ACCESS_KEY}`,
        region: ''
      }
    );
    const params = {
      Bucket: 'travelagency-images',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.upload(params, function (err: any, data: any) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return err;
    //   }
    //   console.log('Successfully uploaded file.', data.Location);
    //   return data.Location;
    // });
    //for upload progress   
    const promise = new Promise((resolve, reject) => {
      bucket.upload(params).on('httpUploadProgress', function (evt) {
        console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err: any, data: any) {
        if (err) {
          console.log('There was an error uploading your file: ');
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    })
    return promise;
  }

  public addHotel(hotel: Hotel) {
    return this.httpClient.post(this.API_PATH + "/hotel/add", hotel);
  }
}
