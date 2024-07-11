<?php

declare(strict_types=1);

namespace App\Application\Actions\SharedBuild;

use App\Application\Actions\Action;
use App\Domain\SharedBuild\SharedBuild;
use Doctrine\ORM\EntityManager;
use Psr\Http\Message\ResponseInterface as Response;

class RegisterBuild extends Action
{
  public function __construct(private EntityManager $em) { }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
      $data = $this->request->getParsedBody();
      $builds = $this->em->getRepository(SharedBuild::class);
      $uid = md5(serialize($data));

      $foundBuild = $builds->findBy(['uid' => $uid], limit: 1);
      
      if($foundBuild) {
        return $this->respondWithData(['uid' => $uid]);
      }

      $build = new SharedBuild($uid, $data);

      $this->em->persist($build);
      $this->em->flush();
      
      return $this->respondWithData(['uid' => $build->uid()]);
    }
}
