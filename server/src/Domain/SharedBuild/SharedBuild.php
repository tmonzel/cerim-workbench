<?php
namespace App\Domain\SharedBuild;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;
use JsonSerializable;

#[Entity, Table(name: 'shared_builds')]
final class SharedBuild implements JsonSerializable
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $id;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $uid;

    #[Column(type: 'json', nullable: false)]
    private array $state;

    public function __construct(string $uid, array $state)
    {
        $this->uid = $uid;
        $this->state = $state;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function uid(): string
    {
        return $this->uid;
    }

    public function state(): array
    {
        return $this->state;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'uid' => $this->uid,
            'state' => $this->state
        ];
    }
}