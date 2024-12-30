import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {


  public user = signal<User>({
    id: 1,
    email: "forge.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public counter = signal(10);

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${ this.counter()} `);
  });


  ngOnInit(): void {

    // Esto es para comprobar el efecto se limpia solo
    // setInterval(() =>  {
    //   this.counter.update( current => current + 1 )
    // }, 1000);
  }


  ngOnDestroy(): void {
   //this.userChangedEffect.destroy();
  }
  increaseBy(value:  number){
    this.counter.update(current => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {
    this.user.update(current => {

      switch(field){
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id  = Number(value);
          break;
      }

      return {...current} ;
    })

    //console.log({field, value});
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // })

  }

}
