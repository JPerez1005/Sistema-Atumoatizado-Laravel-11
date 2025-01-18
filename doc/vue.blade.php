<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista Principal</title>
</head>
<body>
    <!-- descomentar apenas comience a usar sanctum con tokens -->
    <!-- @if(Auth::check())
        <script>
            window.appData = {!! json_encode([
                'isLoggedIn' => true,
                'user' => Auth::user(),
                'token' => session('token'),
            ]) !!};
            console.log(appData); // Verifica los datos en la consola
        </script>
	@else
        <script>
            window.appData = { isLoggedIn: false, user: null, token: null };
            console.log(appData); // Verifica los datos en la consola
        </script>
	@endif -->
    <div id="app"></div>
    @vite(['resources/js/vue/main.js'])
</body>
</html>