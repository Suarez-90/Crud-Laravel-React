<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comments;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Laravel\Prompts\pause;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $postsQuery = Post::with(['comments']);        
        
        if ($request->filled('search')  ) {
            $searchFilter = $request->search;       

            $postsQuery->where(function($query) use($searchFilter){
                $query->where('nro_contract', 'like', "%{$searchFilter}%")
                ->orWhere('name_p', 'like', "%{$searchFilter}%");})
                ->orWhereHas('comments', function($query) use($searchFilter){
                    $query->where('name_c', 'like', "%{$searchFilter}%")
                    ->orWhere('nro_ident', 'like', "%{$searchFilter}%");
                });

            }
        if($request->has('orderPost') && $request->orderPost ==='contrato' ){                        
                $postsQuery->orderBy('nro_contract','asc');            
        } 
        if($request->has('orderPost') && $request->orderPost ==='fecha' ){                        
                $postsQuery->orderBy('date_contract','asc');            
        }       

        $paginationPage = (int) $request->perPage;
        $perPage = $paginationPage==0 ? 2 : $paginationPage;

        $posts = $postsQuery->paginate($perPage)->withQueryString();
        // dump($posts);
        return Inertia::render("dashboard", [
            "posts"=> $posts,
            "filters"=>$request->only(['search', 'perPage', 'orderPost']),
        ]);
    }
    public function indexList(Request $request){

        $postsQuery = Post::with(['comments']);
        
        if ($request->filled('search')  ) {
            $searchFilter = $request->search;       

            $postsQuery->where(function($query) use($searchFilter){
                $query->where('nro_contract', 'like', "%{$searchFilter}%")
                ->orWhere('name_p', 'like', "%{$searchFilter}%");})
                ->orWhereHas('comments', function($query) use($searchFilter){
                    $query->where('name_c', 'like', "%{$searchFilter}%")
                    ->orWhere('nro_ident', 'like', "%{$searchFilter}%");
                });

            }
        if($request->has('orderPost') && $request->orderPost ==='contrato' ){                        
                $postsQuery->orderBy('nro_contract','asc');            
        } 
        if($request->has('orderPost') && $request->orderPost ==='fecha' ){                        
                $postsQuery->orderBy('date_contract','asc');            
        }       

        $paginationPage = (int) $request->perPage;
        $perPage = $paginationPage==0 ? 12 : $paginationPage;

        $posts = $postsQuery->paginate($perPage)->withQueryString();

        return Inertia::render('admin/index',[
            'posts'=> $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/create');
    }

    /**
     * Store a newly created resource in storage.
     * @param StorePostRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePostRequest $request)
    {
        // dd($request->only('nro_c', 'name_c', 'fecha_c'));
        $fc = substr($request->validated('fecha_c'), '0', '10');        
        // $cliente = Post::create($request->only('nro_c', 'name_c', $fc));
        $cliente = Post::create([
            'nro_contract'=>$request->validated('nro_c'),
            'name_p'=> $request->validated('name_c'),
            'date_contract'=> $fc,
        ]);

        if ($request->has('workers')) {
            $comts = $request->validated('workers');
            // $cliente->comments()->create($request->validated('workers'));
            foreach ($comts as $value) {
                $cliente->comments()->create([
                        'name_c'=> $value['name_w'],
                        'nro_ident'=>$value['ci_w']
                    ]);
                };
        };
        return to_route('admin.post.index')->with('success', 'Cliente creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return Inertia::render('admin/create');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     ** @param UpdatePostRequest $request
     ** @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        
        // dd( $request->workers);
        
        if ($post) {            
            $fc = substr($request->validated('fecha_c'), '0', '10');
            $post->update([
                $post->nro_contract = $request->validated('nro_c'),
                $post->name_p = $request->validated('name_c'),
                $post->date_contract = $fc,
            ]);
            
            if($request->has('workers')){
                $comts = $request->workers;
                dd($comts);
                foreach ($comts as $comtsData) {
                    if(isset($comtsData['id'])){
                        $post->comments()
                        ->where('id', $comtsData['id'])
                        ->update([
                            'name_c'=> $comtsData['name_w'],
                            'nro_ident'=>$comtsData['ci_w']
                        ]);
                    }else {
                        dd('No Existe');
                        $post->comments()->create([
                            'name_c'=> $comtsData['name_w'],
                            'nro_ident'=>$comtsData['ci_w']
                        ]);
                    }                
                };
                // return back();
            }
        };       

        return to_route('admin.post.index')->with('success', 'Cliente actualizado correctamente');       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return back();
    }
}
