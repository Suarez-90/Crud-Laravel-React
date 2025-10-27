<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nro_contract' =>fake()->unique()->randomNumber(3, true),
            'name_p' => fake()->unique()->name(),
            'checked'=> $this->faker->boolean(),
            'date_contract' => fake()->date(),
        ];
    }
}
