<script>
    import { onMount } from 'svelte';
    import { Link, navigate, useLocation } from 'svelte-routing';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import HeroeModel from '../models/Heroe.js';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  
    export let id;
    let location = useLocation();
    let heroeId = id || location.params.id;
    
    // URL de tu nuevo backend
    const API_BASE_URL = 'https://crud-heroes-service.vercel.app/api';
    
    // Inicializar el héroe con valores por defecto
    let heroe = {
        _id: '',
        nombre: '',
        poder: '',
        estado: true // Por defecto vivo
    };
  
    onMount(() => {
      if (heroeId !== 'nuevo') {
        getHeroeById(heroeId);
      }
    });
  
    function getHeroeById(heroeId) {
      axios.get(`${API_BASE_URL}/heroes/${heroeId}`)
        .then(res => {
          if (res.data && res.data.heroe) {
            heroe = res.data.heroe;
          }
        })
        .catch(error => {
          console.error('Error al obtener héroe:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar el héroe'
          });
          navigate('/heroes');
        });
    }
  
    function guardar() {
      // Validación básica
      if (!heroe.nombre || !heroe.poder) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos requeridos',
          text: 'Por favor completa el nombre y el poder del héroe'
        });
        return;
      }

      if (heroeId !== 'nuevo') {
        // Actualizar héroe existente
        const heroeData = {
          nombre: heroe.nombre,
          poder: heroe.poder,
          estado: heroe.estado
        };
        
        axios.put(`${API_BASE_URL}/heroes/${heroeId}`, heroeData)
          .then(res => {
            if (res.data) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El héroe ha sido modificado correctamente.',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/heroes');
            }
          })
          .catch(error => {
            console.error('Error al actualizar héroe:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el héroe'
            });
          });
      } else {
        // Crear nuevo héroe
        const heroeData = {
          nombre: heroe.nombre,
          poder: heroe.poder,
          estado: heroe.estado
        };
        
        axios.post(`${API_BASE_URL}/heroes`, heroeData)
          .then(res => {
            if (res.data) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El héroe ha sido creado correctamente.',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/heroes');
            }
          })
          .catch(error => {
            console.error('Error al crear héroe:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el héroe'
            });
          });
      }
    }
  </script>
  
  <div>
    <h1>{heroe.nombre ? `Héroe: ${heroe.nombre}` : 'Nuevo héroe'}</h1>
    <hr />
  
    <div class="row text-right">
      <div class="col">
        <Link to="/heroes" class="btn btn-outline-primary" title="Volver">
          <FontAwesomeIcon icon="arrow-left" /> Volver
        </Link>
      </div>
    </div>
  
    <div class="row">
      <div class="col">
        <form on:submit|preventDefault={guardar}>
          {#if heroeId !== 'nuevo'}
            <div class="form-group">
              <label for="mongoId">ID MongoDB</label>
              <input type="text" class="form-control" placeholder="ID MongoDB" value={heroe._id || ''} disabled id="mongoId">
              <small class="form-text text-muted">Este campo se genera automáticamente por MongoDB.</small>
            </div>
          {/if}
          
          <div class="form-group">
            <label for="nombreInput">Nombre *</label>
            <input type="text" class="form-control" placeholder="Nombre del héroe" bind:value={heroe.nombre} required id="nombreInput">
          </div>
          
          <div class="form-group">
            <label for="poderInput">Poder *</label>
            <input type="text" class="form-control" placeholder="Poder del héroe" bind:value={heroe.poder} required id="poderInput">
          </div>
          
          <div class="form-group">
            <label for="estadoInput">Estado</label>
            <br />
            {#if heroe.estado}
              <button on:click={() => (heroe.estado = false)} class="btn btn-outline-success w-25" type="button" title="Cambiar a muerto">
                <FontAwesomeIcon icon="thumbs-up" title="Vivo" /> Vivo
              </button>            
            {:else}
              <button on:click={() => (heroe.estado = true)} class="btn btn-outline-danger w-25" type="button" title="Cambiar a vivo">
                <FontAwesomeIcon icon="thumbs-down" title="Muerto" /> Muerto
              </button>
            {/if}
          </div>
          
          <hr />
          <div class="form-group text-center">
            <button type="submit" class="btn btn-outline-primary w-25" title="Guardar">
              <FontAwesomeIcon icon="save" title="Guardar" /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>