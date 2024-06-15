<template>
    <div class="container">
      <h2>Users Table</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="selectUser(user)" type="button" class="btn btn-primary btn-sm">Edit</button>
              <button @click="confirmDelete(user.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="selectedUser">
        <h3>Edit user</h3>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="userName">Name</label>
            <input type="text" id="userName" v-model="selectedUser.name" class="form-control">
          </div>
          <div class="form-group">
            <label for="userEmail">Email</label>
            <input type="text" id="userEmail" v-model="selectedUser.email" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/config/axiosConfig';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        users: [],
        selectedUser: null
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axiosInstance.get('/showusers');
          this.users = response.data.users;
        } catch (error) {
          console.error('Error while trying to get users', error);
        }
      },
      selectUser(user) {
        this.selectedUser = { ...user };
      },
      cancelEdit() {
        this.selectedUser = null;
      },
      async saveChanges() {
        try {
          await axiosInstance.put(`/edituser/${this.selectedUser.id}`, this.selectedUser);
          const userIndex = this.users.findIndex(user => user.id === this.selectedUser.id);
          this.users.splice(userIndex, 1, this.selectedUser);
          this.selectedUser = null;
        } catch (error) {
          console.error('Error while trying to save changes', error);
        }
      },
      async deleteUser(userId) {
        try {
          await axiosInstance.delete(`/deleteuser/${userId}`);
          this.users = this.users.filter(user => user.id !== userId);
          Swal.fire('The user has been deleted!', 'success');
        } catch (error) {
          console.error('Error while trying to delete user', error);
          Swal.fire('Error!', 'There was an issue trying to delete this user', 'error');
        }
      },
      confirmDelete(userId) {
        Swal.fire({
          title: 'Are you sure you want delete user?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteUser(userId);
          }
        });
      }
    }
  };
  </script>

  