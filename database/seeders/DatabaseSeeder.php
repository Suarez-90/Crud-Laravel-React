<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name'=>'Sergio',
            'last_name'=>'Suarez Calañas',
            'user_name'=>'ssuarez',
            'user_verified_at'=> now(),
            'active' => true,
            'sucursal'=> 'cienfuegos',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name'=>'Yanela',
            'last_name'=>'Yanela',
            'user_name'=>'yyanela',
            'user_verified_at'=> now(),
            'active' => false,
            'sucursal'=> '5ta y 92',
            'role' => 'editor',
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name'=>'Supervisora',
            'last_name'=>'Supervisora',
            'user_name'=>'ssupervisora',
            'user_verified_at'=> now(),
            'active' => false,
            'sucursal'=> '5ta y 92',
            'role' => 'supervisor',
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            PostSeeder::class,
            CommentsSeeder::class,
        ]);
    }
}
