<template>
   <div>
        <h2>Users Table</h2>
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v.for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td> </td>
                </tr>
            </tbody>
        </table>
   </div>
</template>

<script>
    import axiosInstance from '@/config/axiosConfig';

    export default {
        data() {
            return {
                users: []
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
                    console.error('Error while triying get users', error);
                }
            }
        }
    };
</script>