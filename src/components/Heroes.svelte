<script>
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import HeroeModel from '../models/Heroe.js';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  
    export let heroes = [];
    
    // URL de tu nuevo backend
    const API_BASE_URL = 'https://crud-heroes-service.vercel.app/api';
  
    onMount(() => {
      getHeroes();
    });
  
    function getHeroes() {
      axios.get(`${API_BASE_URL}/heroes`)
        .then(res => {
          // Los datos ya vienen en el formato correcto desde tu backend
          if (res.data && res.data.heroes) {
            heroes = res.data.heroes.map(heroe => ({
              ...heroe,
              id: heroe._id // Mapear _id de MongoDB a id para compatibilidad
            }));
          } else {
            heroes = [];
          }
        })
        .catch(error => {
          console.error('Error al obtener heroes:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los heroes'
          });
          heroes = [];
        });
    }
  
    function borrarHeroe(idHeroe) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este héroe.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${API_BASE_URL}/heroes/${idHeroe}`)
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Héroe eliminado correctamente",
                  showConfirmButton: false,
                  timer: 1500
                });
                getHeroes(); // Recargar la lista
              })
              .catch(error => {
                console.error('Error al eliminar héroe:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se pudo eliminar el héroe'
                });
              });
          }
        });
    }
  </script>
  
  <div>
    <h1>Listado de Heroes</h1>
    <hr>
    <div class="row">
      <div class="col text-right">
        <Link to="/heroe/nuevo" class="btn btn-outline-primary" title="Alta">
          <FontAwesomeIcon icon="plus" /> Nuevo
        </Link>
      </div>
    </div>
  
    <table aria-describedby="tabla-heroes" class="table mt-3">
      <thead class="bg-custom">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Poder</th>
          <th scope="col">Estado</th>
          <th scope="col" colspan="2" class="text-center">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {#if heroes.length > 0}
          {#each heroes as heroe (heroe.id)}
            <tr>
              <td>{heroe.nombre}</td>
              <td>{heroe.poder}</td>
              <td>
                {#if heroe.estado}
                  <FontAwesomeIcon icon="thumbs-up" size="2x" class="text-success" title="Vivo" />
                {:else}
                  <FontAwesomeIcon icon="thumbs-down" size="2x" class="text-danger" title="Muerto" />
                {/if}
              </td>
              <td class="text-center">
                <Link to={`/heroe/${heroe.id}`} class="btn btn-outline-warning mr-1" title="Modificar">
                  <FontAwesomeIcon icon="edit" />
                </Link>
                <button on:click={() => borrarHeroe(heroe.id)} class="btn btn-outline-danger" title="Eliminar">
                  <FontAwesomeIcon icon="trash" />
                </button>
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="5" class="text-center">No hay registros</td>
          </tr>
        {/if}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="bg-custom"><span><em>Copyright© - Carlos Mur</em></span></td>
        </tr>
      </tfoot>
    </table>
  </div>