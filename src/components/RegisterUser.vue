<template>
    <div class="container col-md-4">
        <h2>Register New User</h2>
        <form @submit.prevent="registerUser">
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="name" v-model="name" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form><br>
        <div>
            <button class="btn btn-primary" @click="$router.push('/login')" variant="link">Go to Login</button>
        </div>
    </div>
</template>

<script>
    import axiosInstance from '@/config/axiosConfig';
    
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            async registerUser() {
                try {
                    const response = await axiosInstance.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                    alert(response.message)
                    this.$router.push('/login')
                } catch (error) {
                    alert('Registration fialed')
                }
            }
        }
    }
</script>

<style>
    .container {
        margin: auto;
        padding: 20px;
        margin-top: 100px;
        border: 1px solid blue;
        border-radius: 10px;
    }
</style>