<template>
    <div class="container col-md-4">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form><br>
        <div>
            <button class="btn btn-secondary" @click="$router.push('/register')" variant="link">Register new user</button>
        </div>
    </div>
</template>

<script>
    import axiosInstance from '@/config/axiosConfig';
    export default {
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            async submitForm(){
                try {
                    const response = await axiosInstance.post('/login',{
                        email: this.email,
                        password: this.password
                    })
                    console.log(response);
                    if (response.data.status === 'success') {

                        const token = response.data.authorisation.token;
                        const user = response.data.user;

                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                        this.$router.push('/dashboard');
                    } else {
                        alert('Incorrect email or password, validate your credentials');
                    }
                } catch (error) {
                    console.log('Datos enviados:', {
                                email: this.email,
                                password: this.password
                    });
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