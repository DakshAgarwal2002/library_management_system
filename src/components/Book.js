import React from 'react'

const Book = (props) => {
  return (
    <>
    <div class="card mb-2">
            <div class="row align-items-center">
              <div class="col-sm-2">
                <img src={props.Book.published_works[0].cover_art_url} alt="American Dragons: Twenty-Five Asian American Voices" width="100%"/>
              </div>

              <div class="col-sm-10">
                <div class="card-body">

                  <h5 class="card-title">{props.Book.title}</h5>

                  <p class="my-1 text-muted">
                    <strong>Authors:</strong> Laurence Yep
                  </p>

                  <p class="my-1 text-muted">
                    <strong>Suggested age:</strong> None - None
                  </p>

                  <p class="my-1 text-muted">
                    <strong>Lexile: </strong>930
                  </p>

                  <p class="my-1 text-muted">
                    <strong>Page Count:</strong> 256
                  </p>

                  <p class="my-1 text-muted">
                    <strong>Categories:</strong> Fiction, Non-fiction &amp; Poetry
                  </p>

                  <p class="my-1">
                    <strong>Summary:</strong>
                  </p>
                  <p class="my-1">
                    *****This collection of poems, stories and one short play includes works by Tibetan Americans, Vietnamese Americans, Korean Americans, Japanese Americans and Thai Americans--known and unknown, young and old--who write about growing up, fitting in, and relating to the older generation. A 1994 ALA Best Book for Young Adults.
                  </p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Book