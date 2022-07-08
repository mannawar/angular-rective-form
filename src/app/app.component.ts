import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  forbiddenProjects = [
    'Test', 'Dev', 'Project1', 'test'
  ]

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectData': new FormGroup({
        'projectname': new FormControl(null, Validators.required, this.forbiddenProj.bind(this)),
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    })
  }

  // Mimicking the data is fetched from some web-server using setTimeout
  forbiddenProj(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.forbiddenProjects.indexOf(control.value) !== -1) {
          resolve({'isForbiddenProjectName': true})
        }
        else {
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
