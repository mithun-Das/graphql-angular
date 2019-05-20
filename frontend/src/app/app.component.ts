import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache()
    });
  }

  ngOnInit() {

    const getPosts = gql`{getPosts
                  {
                    id
                    title
                    content
                  }
                }`;

    const getPost = gql`{getPost(title: "image test" )
                  {
                    id
                    title
                    content
                  }
                }`;

    this.apollo.watchQuery({
      query: getPosts,
      fetchPolicy: "network-only"
    })
    .valueChanges.subscribe((result) => {
      console.log(result);
    });


    this.apollo.watchQuery({
      query: getPost,
      fetchPolicy: "network-only"
    })
      .valueChanges.subscribe((result) => {
        console.log(result);
      });
  }

}
