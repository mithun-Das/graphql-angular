import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private apollo: Apollo) {}

  ngOnInit() {

    // const getPost = gql`{Getpost
    //               {
    //                 id
    //                 title
    //                 content
    //               }
    //             }`;

    // this.apollo.watchQuery({
    //   query: getPost,
    //   fetchPolicy: "network-only"
    // })
    // .valueChanges.subscribe((result) => {
    //   console.log(result);
    // });

  }

}
