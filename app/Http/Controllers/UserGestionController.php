<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $userQuery = User::latest();

        if ($request->filled('search')  ) {
            $searchFilter = $request->search;       

            $userQuery->where(function($query) use($searchFilter){
                $query->where('name', 'like', "%{$searchFilter}%")
                ->orWhere('last_name', 'like', "%{$searchFilter}%")
                ->orWhere('user_name', 'like', "%{$searchFilter}%")
                ->orWhere('sucursal', 'like', "%{$searchFilter}%");                
            });
        }
        $paginationPage = (int) $request->perPage;
        $perPage = $paginationPage==0 ? 15 : $paginationPage;

        $users = $userQuery->paginate($perPage)->withQueryString();
        return Inertia::render('admin/index-users', [
            'users'=> $users,
            "filters"=>$request->only(['search', 'perPage'])        
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        dd($user);
    }
}
