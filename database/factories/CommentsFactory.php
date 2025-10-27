<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comments>
 */
class CommentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_c' => fake()->unique()->name(),
            'nro_ident'=> $this->faker->unique()->randomNumber(),
            // 'nro_ident'=> fake($this->faker->randomNumber()),
            // 'user_id' => ,
            'post_id'=> rand(1, 25),
        ];
    }
}
