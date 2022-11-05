import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel } from 'classes/hotel';
import { User } from 'classes/user';
import { observable, Observable } from 'rxjs';
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_PATH = "http://localhost:8080";
  // requestHeader = new HttpHeaders(
  //   { "No-Auth": "True" }
  // );

  constructor(private httpClient: HttpClient) { }

  public forAdmin() {
    return this.httpClient.get(this.API_PATH + "/forAdmin", {
      responseType: 'text',
    });
  }

  public findAllUsers() {
    return this.httpClient.get(this.API_PATH + "/users/all");
  }

  public findUserByEmail(email: string | undefined): Observable<User> {
    return this.httpClient.get<User>(this.API_PATH + "/users/findByEmail?email=" + email);
  }

  public addRoleToUser(roleData: NgForm) {
    let params = new HttpParams();
    params = params.set('email', roleData.value.email);
    params = params.set('role', roleData.value.role);
    return this.httpClient.post(this.API_PATH + "/addRoleToUser", params);
  }

  // public upload(file: any) :Observable<any>{
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);

  //   return this.httpClient.post(this.FILE_API_URL, formData);
  // }
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
