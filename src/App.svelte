<script>
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import Heroes from './components/Heroes.svelte';
  import Heroe from './components/Heroe.svelte';
  import Error from './components/Error.svelte';

  import { library } from '@fortawesome/fontawesome-svg-core';
  import {
    faPlus,
    faThumbsUp,
    faThumbsDown,
    faEdit,
    faTrash,
    faExclamation,
    faSpinner,
    faArrowLeft,
    faSave,
  } from '@fortawesome/free-solid-svg-icons';

  onMount(() => {
    library.add(faPlus, faThumbsUp, faThumbsDown, faEdit, faTrash, faExclamation, faSpinner, faArrowLeft, faSave);
  });
</script>

<div class="m-5">
  <Router basepath="/">
    <Route path="/">
      <Heroes />
    </Route>
    <Route path="/heroes">
      <Heroes />
    </Route>
    <Route path="/heroe/:id" let:params>
      <Heroe id={params.id} />
    </Route>
    <Route path="*">
      <Error />
    </Route>
  </Router>
</div>
