<?php

declare(strict_types=1);

namespace App\Application\Actions\SharedBuild;

use App\Application\Actions\Action;
use App\Domain\SharedBuild\SharedBuild;
use Doctrine\ORM\EntityManager;
use Psr\Http\Message\ResponseInterface as Response;

class FindBuild extends Action
{
  public function __construct(private EntityManager $em) { }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
      $uid = $this->args['uid'];

      $builds = $this->em->getRepository(SharedBuild::class);
      $foundBuild = $builds->findBy(['uid' => $uid], limit: 1);
      
      if($foundBuild) {
        return $this->respondWithData($foundBuild[0]);
      }
      
      return $this->respondWithData(null, 404);
    }
}
